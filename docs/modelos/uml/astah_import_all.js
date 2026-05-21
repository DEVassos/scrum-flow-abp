/*
 ECMAScript para Astah — importador único de diagramas RF01..RF12

 Explicação: cria pacotes, classes, atributos e diagramas de classe/seqüência
 para todos os RFs. Pode requerer pequenos ajustes dependendo da versão do Astah.
 */

try {
    var ProjectAccessorFactory = Packages.com.change_vision.jude.api.app.ProjectAccessorFactory;
    var projectAccessor = ProjectAccessorFactory.getProjectAccessor();
    var project = projectAccessor.getProject();
    var modelEditor = projectAccessor.getModelEditor();

    var DiagramEditorFactory = Packages.com.change_vision.jude.api.inf.editor.EditorFactory.getDiagramEditorFactory();
    var classDiagramEditor = DiagramEditorFactory.getClassDiagramEditor();
    var sequenceDiagramEditor = DiagramEditorFactory.getSequenceDiagramEditor();

    // Helper: create class with attributes
    function createClass(pkgOrParent, name, attributes) {
        var cls = modelEditor.createClass(pkgOrParent, name);
        if (attributes && attributes.length) {
            for (var i = 0; i < attributes.length; i++) {
                try {
                    modelEditor.createAttribute(cls, attributes[i].name, attributes[i].type);
                } catch (e) {
                    print('Aviso createAttribute falhou para ' + name + '.' + attributes[i].name + ': ' + e);
                }
            }
        }
        return cls;
    }

    // Helper: add class to class diagram
    function addClassToDiagram(diagram, cls, x, y) {
        try {
            classDiagramEditor.addClass(diagram, cls, x, y);
        } catch (e) {
            print('Aviso addClassToDiagram falhou: ' + e);
        }
    }

    // Helper: create sequence diagram with lifelines and messages
    function createSequence(diagramName, lifelines, messages) {
        var seq = sequenceDiagramEditor.createSequenceDiagram(project, diagramName);
        var created = {};
        var offsetX = 100;
        for (var i = 0; i < lifelines.length; i++) {
            try {
                var lf = sequenceDiagramEditor.createLifeline(seq, lifelines[i], offsetX + i * 150, 100);
                created[lifelines[i]] = lf;
            } catch (e) {
                print('Aviso createLifeline falhou para ' + lifelines[i] + ': ' + e);
            }
        }
        for (var j = 0; j < messages.length; j++) {
            var m = messages[j];
            try {
                var from = created[m.from];
                var to = created[m.to];
                if (from && to) {
                    sequenceDiagramEditor.createMessage(seq, from, to, m.label);
                } else {
                    print('Aviso: lifeline não encontrada para mensagem: ' + m.label);
                }
            } catch (e) {
                print('Aviso createMessage falhou: ' + e);
            }
        }
        return seq;
    }

    // Package onde vamos criar os modelos
    var root = project;
    var pkg = modelEditor.createPackage(root, 'Generated_RF_Diagrams');

    // Definição simplificada por RF (classes + sequência)
    var rfs = [
        {
            id: 'RF01',
            classes: [
                {name: 'Usuario', attributes: [{name: 'id_usuario', type: 'Integer'}, {name: 'nome', type: 'String'}, {name: 'email', type: 'String'}]},
                {name: 'Exame', attributes: [{name: 'id_exame', type: 'Integer'}, {name: 'id_modulo', type: 'Integer'}, {name: 'tentativa', type: 'Integer'}]},
                {name: 'Modulo', attributes: [{name: 'id_modulo', type: 'Integer'}, {name: 'titulo', type: 'String'}]}
            ],
            sequence: {
                name: 'RF01_Cadastro',
                lifelines: ['Usuario','UsuariosRoute','UsuariosRepository','Database'],
                messages: [
                    {from:'Usuario', to:'UsuariosRoute', label: 'POST /api/usuarios(nome,email,cpf,senha)'},
                    {from:'UsuariosRoute', to:'UsuariosRepository', label: 'createUsuario(...)'},
                    {from:'UsuariosRepository', to:'Database', label: 'INSERT usuarios'},
                    {from:'UsuariosRepository', to:'Database', label: 'SELECT id_modulo'},
                    {from:'UsuariosRepository', to:'Database', label: 'INSERT exames (tentativa=1)'},
                    {from:'UsuariosRepository', to:'UsuariosRoute', label: 'usuario criado'},
                    {from:'UsuariosRoute', to:'Usuario', label: '201 Created'}
                ]
            }
        }
    ];

    // RF02..RF12: gerar versões simples baseadas em nomes
    for (var k = 2; k <= 12; k++) {
        var id = (k < 10) ? '0' + k : '' + k;
        var rfId = 'RF' + id;
        rfs.push({
            id: rfId,
            classes: [ {name: rfId + '_Domain', attributes: []} ],
            sequence: { name: rfId + '_Sequence', lifelines: ['Usuario','Route','Repository','Database'], messages: [ {from:'Usuario', to:'Route', label: 'action'}, {from:'Route', to:'Repository', label: 'call'}, {from:'Repository', to:'Database', label: 'query'} ] }
        });
    }

    // Criar diagramas para cada RF
    for (var r = 0; r < rfs.length; r++) {
        var rf = rfs[r];
        try {
            var cd = classDiagramEditor.createClassDiagram(pkg, rf.id + ' Class Diagram');
            for (var c = 0; c < rf.classes.length; c++) {
                var clsDef = rf.classes[c];
                var cls = createClass(pkg, clsDef.name, clsDef.attributes);
                addClassToDiagram(cd, cls, 100 + c * 150, 100);
            }
            // criar sequência
            createSequence(rf.sequence.name, rf.sequence.lifelines, rf.sequence.messages);
            print('Criado: ' + rf.id);
        } catch (e) {
            print('Erro criando RF ' + rf.id + ': ' + e);
        }
    }

    // Salva o projeto Astah com os novos diagramas (pede caminho de salvamento na API)
    try {
        projectAccessor.saveAs('Generated_RF_Diagrams.asta');
    } catch (e) {
        print('Aviso: saveAs pode não estar disponível ou requerer confirmação do usuário: ' + e);
    }
    print('Script finalizado.');

} catch (err) {
    print('Erro geral no script: ' + err + '\nVerifique se o Astah está executando e se a API de scripting é compatível com as chamadas usadas.');
}
