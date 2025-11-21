package eu.consilium.core.util.mapper;


import eu.consilium.core.model.dto.transaction.TransactionDTO;
import eu.consilium.core.model.entity.transaction.TransactionEntity;
import eu.consilium.core.model.enums.TransactionStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TransactionMapper {
    private final UserMapper userMapper;

    public TransactionDTO toDTO(TransactionEntity transactionEntity) {
        return TransactionDTO.builder()
                .id(transactionEntity.getId())
                .fromUser(userMapper.toDTO(transactionEntity.getFromUser()))
                .toUser(userMapper.toDTO(transactionEntity.getToUser()))
                .amount(transactionEntity.getAmount())
                .status(transactionEntity.getStatus().name())
                .timestamp(transactionEntity.getTimestamp())
                .build();
    }

    public TransactionEntity toEntity(TransactionDTO transactionDTO) {
        return TransactionEntity.builder()
                .id(transactionDTO.getId())
                .fromUser(userMapper.toEntity(transactionDTO.getFromUser()))
                .toUser(userMapper.toEntity(transactionDTO.getToUser()))
                .amount(transactionDTO.getAmount())
                .status(TransactionStatus.valueOf(transactionDTO.getStatus()))
                .timestamp(transactionDTO.getTimestamp())
                .build();
    }
}
